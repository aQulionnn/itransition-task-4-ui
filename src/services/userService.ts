import type { AxiosInstance } from "axios";

export const getUsers = async (api: AxiosInstance) => {
    const { data } = await api.get<User[]>('/users')
    return data
}

export const blockUsers = async (api: AxiosInstance, userIds: string[]) => {
    await api.post<void>("/users/block", { userIds } satisfies BlockUsersRequest);
};

export const unblockUsers = async (api: AxiosInstance, userIds: string[]) => {
    await api.post<void>("/users/unblock", { userIds } satisfies UnblockUsersRequest);
};

export const deleteUsers = async (api: AxiosInstance, ids: string[]) => {
    await api.delete<void>("/users", { data: { ids } satisfies DeleteUsersRequest });
};