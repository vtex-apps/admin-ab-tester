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
}


