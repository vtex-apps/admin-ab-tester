import { ReactNode } from 'react'

declare global {
  interface ContextChildren {
    children: ReactNode
  }
  interface ABTest {
    ABTestBeginning: string
    Winner: string
    WorkspaceA: string
    WorkspaceB: string
  }
  interface ABTestContextInterface {
    tests: ABTest[] | undefined
    handleNewModal: (isOpen: boolean, type: "CREATE" | "DELETE") => void
    modalOpen: Modal
    createNewTest: (test: NewTest) => void
    loading: boolean
    error: string
    success: string
    setError: (error: string) => void
    clearGeneralState: () => void
  }
  interface GeneralState{
    loading: boolean,
    error: string,
    success: string
  }
  interface RowHeader {
    rowData: { name: string }
  }
  interface Modal {
    isOpen: boolean,
    type: string
  }
  interface EventInterface {
    target: {
      value: string
      name: string
    }
  }
  interface NewTest {
    name: string
    proportion: number
    hours: number
    type: string
  }
}
