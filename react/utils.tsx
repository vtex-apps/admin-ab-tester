import React from 'react'
import {
  Button,
} from 'vtex.styleguide'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'


import { useABTestContext } from './context/'

export const checkWorkspaceName = (name: string) => {
  if (name === "") return false
  const noSpecialChars = new RegExp(
    '^.*[-!$%^&*()_+|~=`{}[\\]:";\'<>?,./]+.*$'
  );
  const noMayusc = new RegExp('[A-Z]');
  if (!noSpecialChars.test(name) && !noMayusc.test(name)) {
    return true;
  } else {
    return false;
  }
};

export const formatData = (data: any) => {
  const newData: any = [];

  const keys = Object.keys(data[0]);

  keys.forEach((key) => {
    const aux: any = {};
    const masterKeys = ['WorkspaceA', 'ConversionA', 'ConversionALast24Hours', 'WorkspaceASessions', 'WorkspaceASessionsLast24Hours']
    data.forEach((item: any) => {
      if (key !== '__typename' && key !== 'Finish') {
        if (masterKeys.includes(key)) {
          aux[item.WorkspaceB] = null
          aux[item.WorkspaceA] = item[key]
        } else {
          aux[item.WorkspaceB] = item[key]
          aux[item.WorkspaceA] = null
        }
      }

      if (key === 'Finish') (aux[item.WorkspaceB] = { type: 'finish', value: item[key] })
      if (key !== '__typename') aux.Value = { type: 'key', value: key }
    });
    newData.push(aux);
  });

  const toUnify = [
    'WorkspaceA',
    'WorkspaceB',
    'ConversionA',
    'ConversionB',
    'ConversionALast24Hours',
    'ConversionBLast24Hours',
    'WorkspaceASessions',
    'WorkspaceBSessions',
    'WorkspaceASessionsLast24Hours',
    'WorkspaceBSessionsLast24Hours'
  ]

  const newData2: any = newData.filter((item: any) => {
    return !toUnify.includes(item?.Value?.value)
  });

  for (let i = 0; i < toUnify.length; i = i + 2) {
    merge(newData.find((item: any) => item.Value?.value === toUnify[i]), newData.find((item: any) => item.Value?.value === toUnify[i + 1]))
  }

  newData2.forEach((item: any) => console.log("item---", item))

  function merge(obj1: any, obj2: any) {
    const answer: any = {}
    for (let key in obj1) {
      if (answer[key] === undefined || answer[key] === null)
        answer[key] = obj1[key];
    }
    for (let key in obj2) {
      if (answer[key] === undefined || answer[key] === null)
        answer[key] = obj2[key];
    }
    if (obj1?.Value) {
      switch (obj1.Value?.value) {
        case 'WorkspaceA' || 'WorkspaceB': {
          answer.Value.value = 'Workspace'
          newData2.push(answer)
          break
        }
        case 'ConversionA' || 'ConversionB': {
          answer.Value.value = 'Conversion'
          newData2.push(answer)
          break
        }
        case 'ConversionALast24Hours' || 'ConversionBLast24Hours': {
          answer.Value.value = 'ConversionLast24Hours'
          newData2.push(answer)
          break
        }
        case 'WorkspaceASessions' || 'WorkspaceBSessions': {
          answer.Value.value = 'WorkspaceSessions'
          newData2.push(answer)
          break
        }
        case 'WorkspaceASessionsLast24Hours' || 'WorkspaceBSessionsLast24Hours': {
          answer.Value.value = 'workspacesessionslast24hours'
          newData2.push(answer)
          break
        }
      }
    }
    return answer
  }
  console.log("newData2---", newData2)
  return newData2
}



export const getPropertiesForSchema = (tests: any) => {
  const intl = useIntl()

  const { finishTest } = useABTestContext()

  const properties: any = {};
  properties.Value = {
    name: {
      minWidth: 200,
      title: 'Name'
    },
  }
  tests && Object.keys(tests[0]).forEach(
    (item) => {
      (properties[item] = {
        minWidth: 200, title: item, cellRenderer: ({ cellData }: { cellData: any }) => {
          return (
            <>
              {
                cellData?.type === 'finish' ? <Button onClick={() => finishTest(cellData.value)}> Finish </Button> : cellData?.type === 'key' ? <FormattedMessage id={`admin/admin.app.abtest.table.label.${cellData.value.toLowerCase()}`} /> : cellData
              }
            </>)
        },
      })
    }

  );


  return properties
}
