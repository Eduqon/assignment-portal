import create from 'zustand'

export const ClientStore = create(set => ({
    id: '',
    country: '',
    existingUser: false,

    setId: (userid) => set({ id: userid }),
    setCountry: (userCountry) => set({ country: userCountry }),
    setExistingUser: (existingUser) => set({existingUser: existingUser}),
}));





//increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
//removeAllBears: () => set({ bears: 0 })