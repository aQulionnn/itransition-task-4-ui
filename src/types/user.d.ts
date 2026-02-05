type User = {
    id: string
    email: string
    firstName: string
    lastName: string
    lastLoginAtUtc: Date | null
    status: string
}

type BlockUsersRequest = {
    userIds: string[]
}

type UnblockUsersRequest = {
    userIds: string[]
}

type DeleteUsersRequest = {
    ids: string[]
}