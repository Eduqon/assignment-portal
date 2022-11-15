import create from 'zustand'

export const SideBarStore = create(set => ({
    acitveId: 'hh4',
    

    setActiveId: (id) => set({ acitveId: id }),
    
}));
