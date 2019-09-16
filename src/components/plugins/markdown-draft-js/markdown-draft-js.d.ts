import { RawDraftContentState } from "draft-js";

export function draftToMarkdown(rawDraftObject: any, options: any | undefined): string

export function markdownToDraft(markdown: string, options: any): RawDraftContentState