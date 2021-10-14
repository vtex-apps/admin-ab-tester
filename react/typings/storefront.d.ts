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
    ConversionA: number
    ConversionALast24Hours: number
    ConversionB: number
    ConversionBLast24Hours: number
    WorkspaceASessions: number
    WorkspaceBSessions: number
    WorkspaceASessionsLast24Hours: number
    WorkspaceBSessionsLast24Hours: number
  }
  interface ABTestContextInterface {
    tests: ABTest[] | undefined
    handleNewModal: (isOpen: boolean, type: "CREATE" | "DELETE") => void
    modalOpen: Modal
    createNewTest: (test: NewTest) => void
    finishTest: (workspace: string) => void
    loading: boolean
    error: string
    success: string
    setError: (error: string) => void
    clearGeneralState: () => void
    emptyMessage: string
  }
  interface GeneralState {
    loading: boolean,
    error: string,
    success: string
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
  interface RowHeader {
    rowData: ABTest
  }
}
