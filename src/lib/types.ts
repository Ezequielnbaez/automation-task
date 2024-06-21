import {z} from 'zod';
import { ConnectionProviderProps } from '@/providers/connection-provider';

export const WorkflowFormSchema = z.object({
    newtitle:z.string().min(1,'Required'),
    newdesc:z.string().min(1,'Required')
})

export type userConfigProps = {
  fname: string;
  lname: string;
  mail: string;
};

export type WorkflowData ={
  nodes: string | null,
  edges: string | null,
}

export const SettingsFormSchema = z.object({
    fname:z.string().min(1,'Required'),
    lname:z.string().min(1,'Required'),
    mail:z.string().min(1,'Required')
})

export type EditorCanvasTypes =
  | 'Email'
  | 'Condition'
  | 'AI'
  | 'Slack'
  | 'Discord'
  | 'Google Drive'
  | 'Notion'
  | 'Trigger'
  | 'Action'
  | 'Wait'
    'wtf'

export type EditorCanvasCardType = {
  title: string
  description: string
  completed: boolean
  current: boolean
  metadata: any
  type: EditorCanvasTypes
}

export type EditorNodeType = {
  id: string
  type: EditorCanvasCardType['type']
  position: {
    x: number
    y: number
  }
  data: EditorCanvasCardType
}

export type EditorNode = EditorNodeType

export type EditorActions =
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorNode[]
        edges: {
          id: string
          source: string
          target: string
        }[]
      }
    }
  | {
      type: 'UPDATE_NODE'
      payload: {
        elements: EditorNode[]
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'SELECTED_ELEMENT'
      payload: {
        element: EditorNode
      }
    }

export const nodeMapper: Record<string, string> = {
  Notion: 'notionNode',
  Slack: 'slackNode',
  Discord: 'discordNode',
  'Google Drive': 'googleNode',
}

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  connectionKey: keyof ConnectionProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}


export interface IProduct {
  title: string;
  cost: number;
  credits: number;
}


