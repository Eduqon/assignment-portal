import create from 'zustand'

export const AssignmentFormStore = create(set => ({
    id: '',
    subject: '',
    pages: '',
    deadline: '',
    level: '',
    reference: '',
    description: '',
    file: '',
    

    setId: (userid) => set({ id: userid }),
    setSubject: (formSubject) => set({ subject: formSubject }),
    setPages: (formPages) => set({ pages: formPages }),
    setDeadline: (formDeadline) => set({ deadline: formDeadline }),
    setLevel: (formLevel) => set({ level: formLevel }),
    setReference: (formReference) => set({ reference: formReference }),
    setDescription: (formDescription) => set({ description: formDescription }),
    setFile: (formFile) => set({ file: formFile }),
    clearAssignmentStore: () => set({
        id: "",
        subject: "",
        pages: "",
        deadline: "",
        level: "",
        reference: "",
        description: "",
        file: ""
    })
}));