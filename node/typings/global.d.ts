import { RecorderState, ServiceContext } from '@vtex/api'

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }

  interface WorkspaceMetadata {
    name: string;
    weight: number;
    production: boolean;
  }

  interface ABTest {
    ABTestBeginning: string
    Winner: string
    WorkspaceB: string
    ConversionA: number
    ConversionALast24Hours: number
    ConversionB: number
    ConversionBLast24Hours: number
    WorkspaceBSessions: number
    WorkspaceBSessionsLast24Hours: number
    hours: number
    proportion: number
    type: string
    Finish: string
  }
}


