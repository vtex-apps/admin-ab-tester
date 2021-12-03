import React from 'react'
import {
  Button,
} from 'vtex.styleguide'
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
  const flattenData: any = [];

  const keys = Object.keys(data[0]);

  keys.forEach((key) => {
    const aux: any = {};
    const masterKeys = ['ConversionA', 'ConversionALast24Hours', 'WorkspaceASessions', 'WorkspaceASessionsLast24Hours']
    data.forEach((item: any) => {
      if (key !== '__typename' && key !== 'Finish' && key !== '[[Prototype]]' && key !== 'WorkspaceA' && key !== 'WorkspaceB') {
        if (masterKeys.includes(key)) {
          aux[item.WorkspaceA] = item[key]
          aux[item.WorkspaceB] = null
        } else {
          aux[item.WorkspaceA] = null
          aux[item.WorkspaceB] = item[key]
        }
      }
      if (key === 'Finish') (aux[item.WorkspaceB] = { type: 'finish', value: item[key] })
      if (key === 'proportion') (aux[item.WorkspaceB] = { type: 'proportion', value: item[key] })
      if (key !== '__typename' && key !== "WorkspaceB" && key !== "WorkspaceA") aux.Value = { type: 'key', value: key }
    });
    flattenData.push(aux);
  });

  const toUnify = [
    'ConversionA',
    'ConversionB',
    'ConversionALast24Hours',
    'ConversionBLast24Hours',
    'WorkspaceASessions',
    'WorkspaceBSessions',
    'WorkspaceASessionsLast24Hours',
    'WorkspaceBSessionsLast24Hours'
  ]

  const formattedData: any = flattenData.filter((item: any) => {
    return !toUnify.includes(item?.Value?.value) && Object.keys(item).length !== 0
  });

  const newData = formattedData.slice(0, -1)

  for (let i = 0; i < toUnify.length; i = i + 2) {
    merge(flattenData.find((item: any) => item.Value?.value === toUnify[i]), flattenData.find((item: any) => item.Value?.value === toUnify[i + 1]))
  }

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
        case 'ConversionA' || 'ConversionB': {
          answer.Value.value = 'Conversion'
          newData.push(answer)
          break
        }
        case 'ConversionALast24Hours' || 'ConversionBLast24Hours': {
          answer.Value.value = 'ConversionLast24Hours'
          newData.push(answer)
          break
        }
        case 'WorkspaceASessions' || 'WorkspaceBSessions': {
          answer.Value.value = 'WorkspaceSessions'
          newData.push(answer)
          break
        }
        case 'WorkspaceASessionsLast24Hours' || 'WorkspaceBSessionsLast24Hours': {
          answer.Value.value = 'workspacesessionslast24hours'
          newData.push(answer)
          break
        }
      }
    }
    return answer
  }
  newData.push(formattedData[formattedData.length - 1])

  return newData
}



export const getPropertiesForSchema = (tests: any) => {
  const { finishTest } = useABTestContext()

  const properties: any = {};
  properties.Value = {
    name: {
      title: '',
      width: 600
    },
  }
  tests.length && Object.keys(tests[0]).forEach((item) => {
    properties[item] = {
      title: item, width: item !== "Value" ? 250 : 300, cellRenderer: ({ cellData }: { cellData: any }) => {
        return (
          <>
            {
              cellData?.type === 'finish' ? <Button onClick={() => finishTest(cellData.value)}><FormattedMessage id={`admin/admin.app.abtest.table.label.finishLabel`} /> </Button> : cellData?.type === 'key' ? <span className="b c-muted-2"><FormattedMessage id={`admin/admin.app.abtest.table.label.${cellData.value.toLowerCase()}`} /></span> : cellData?.type === 'proportion' ? <p>%{cellData.value}</p> : cellData
            }
          </>
        )
      },
    }
  }

  );

  return properties
}
