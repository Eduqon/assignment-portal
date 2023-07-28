import create from "zustand";

export const UserStore = create((set) => ({
  id: "",
  name: "",
  contact_no: "",
  role: "",
  loader: false,
  token: "",

  setId: (id) => set({ id: id }),
  setName: (name) => set({ name: name }),
  setContactNo: (contact_no) => set({ contact_no: contact_no }),
  setRole: (role) => set({ role: role }),
  setLoader: (st) => set({ loader: st }),
  setToken: (token) => set({ token: token }),
}));
