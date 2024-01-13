import axios from 'axios';
import { MetaFromAI } from '../../dispatches';
import { Message, ChatCompletion, ExtractAIProfileResponse, ExtractAIChatResponse, ChatCompletionDefaultModel } from '../chatApi';
import { B64Image, ImageGeneration } from '../imageApi';
import { ChatMessageContent } from '../../AppState';
import { removeSpecialCharsAndParse } from "../../utils/ParsingUtils";

const openAiUrl = 'https://api.openai.com/v1';

const chatCompletionWithModel: ChatCompletion = (openAiKey: string, model: string, messages: Message[]): Promise<Message> => axios.post(`${openAiUrl}/chat/completions`, {
    "model": model,
    "messages": messages
}, {
    headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
    }
}).then((result) => {
    console.log(result.data);
    const response = result.data.choices[0].message;
    return response;
});

export const chatCompletionGPT3: ChatCompletionDefaultModel = (openAiKey: string, messages: Message[]): Promise<Message> =>
    chatCompletionWithModel(openAiKey, 'gpt-3.5-turbo', messages);

export const chatCompletionGPT4: ChatCompletionDefaultModel = (openAiKey: string, messages: Message[]): Promise<Message> =>
    chatCompletionWithModel(openAiKey, 'gpt-4', messages);

export const imageGeneration: ImageGeneration = (openAiKey: string, prompt: string): Promise<B64Image> => axios.post(`${openAiUrl}/images/generations`, {
    "prompt": prompt,
    "n": 1,
    "size": "256x256",
    "response_format": "b64_json"
}, {
    headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
    }
}).then((result) => {
    console.log(result.data);
    const response = result.data.data[0].b64_json;
    return response;
});

export const listEngines = (openAiKey: string) => axios.get(`${openAiUrl}/engines`, {
    headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
    }
});

export const extractAIProfileResponse: ExtractAIProfileResponse = (response: any): MetaFromAI => {
    return removeSpecialCharsAndParse(response.content);
}

export const extractAIChatResponse: ExtractAIChatResponse = (response: any): ChatMessageContent => {
    return removeSpecialCharsAndParse(response.content);
}