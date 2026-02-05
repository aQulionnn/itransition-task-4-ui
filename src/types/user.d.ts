type User = {
    id: string
    email: string
    firstName: string
    lastName: string
    lastLoginAtUtc: Date | null
    status: string
}

type BlockUsersRequest = {
    ids: string[]
}

type UnblockUsersRequest = {
    ids: string[]
}

type DeleteUsersRequest = {
    ids: string[]
}