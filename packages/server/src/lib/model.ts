import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { findSupportedChatModel, type SupportedChatModel, type SupportedChatModelId, type SupportedProvider } from "@principia/shared"
import type { LanguageModel } from "ai"

type AnthropicModelId = Extract<SupportedChatModel, { provider: "anthropic" }>["id"]
type OpenAIModelId = Extract<SupportedChatModel, { provider: "openai" }>["id"]
type NvidiaModelId = Extract<SupportedChatModel, { provider: "nvidia" }>["id"]

export type ResolvedModel = {
    model: LanguageModel
    provider: SupportedProvider
    modelId: SupportedChatModelId
}

const nvidia = createOpenAICompatible({
    name: "nvidia",
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey: process.env.NVIDIA_API_KEY,
    includeUsage: true
})

function assertUnsopportedProvider(provider: never): never {
    throw new Error(`Unsopported Provider: ${provider}`)
}

function resolveAnthropicModel(modelId: AnthropicModelId): ResolvedModel {
    return {
        model: anthropic(modelId),
        provider: 'anthropic',
        modelId
    }
}

function resolveOpenAIModel(modelId: OpenAIModelId): ResolvedModel {
    return {
        model: openai(modelId),
        provider: 'openai',
        modelId
    }
}

function resolveNvidiaModel(modelId: NvidiaModelId): ResolvedModel {
    return {
        model: nvidia(modelId),
        provider: 'nvidia',
        modelId
    }
}

function resolveSupportedChatModel(model: SupportedChatModel): ResolvedModel {
    const provider = model.provider

    switch (provider) {
        case 'anthropic':
            return resolveAnthropicModel(model.id)
        case 'openai':
            return resolveOpenAIModel(model.id)
        case 'nvidia':
            return resolveNvidiaModel(model.id)
        default:
            return assertUnsopportedProvider(provider)
    }
}

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
    return findSupportedChatModel(modelId) != null
}

export function resolveChatModel(modelId: string): ResolvedModel {
    const model = findSupportedChatModel(modelId)

    if (!model) {
        throw new Error(`Unsopperted Model: ${modelId}`)
    }

    return resolveSupportedChatModel(model)
}