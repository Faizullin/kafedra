type TLoadingStateKey = "post" | "detail" | "list"

export type ILoadingState = Partial<Record<TLoadingStateKey, boolean>>