import api from "./axios";

export async function inviteUser(email: string, password: string) {
    const res = await api.post("/tenant/invite", {
        email,
        password,
    });

    return res.data;
}