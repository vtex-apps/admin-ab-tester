import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  Table,
  Tag,
  Alert,
  Modal,
  Input,
  Dropdown,
  Button,
  // ModalDialog,
  ActionMenu,
  IconExternalLink
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import { useABTestContext } from '../../context'

import { checkWorkspaceName } from "./../../utils"

const ABTestTable = () => {
  const { tests, handleNewModal, modalOpen, createNewTest, error, setError, success, clearGeneralState, loading, finishTest } = useABTestContext()

  const { account } = useRuntime()

  const [newTest, setNewTest] = useState<NewTest>({
    name: "",
    proportion: 0,
    hours: 0,
    type: ""
  })


  const isValid = () => {
    if (checkWorkspaceName(newTest.name) && newTest.proportion && newTest.hours && newTest.type) {
      return true
    }
  }

  const intl = useIntl()

  const defaultSchema = {
    properties: {
      WorkspaceB: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.workspaceName',
        }),
        cellRenderer: ({ cellData }: { cellData: string }) => {
          return (
            <ActionMenu
              label={cellData}
              hideCaretIcon
              align="left"
              buttonProps={{
                icon: <IconExternalLink color="currentColor" />,
                variation: 'tertiary',
              }}
              options={[
                {
                  label: 'Front',
                  onClick: () => window.open(`https://${cellData}--${account}.myvtex.com`)
                },
                {
                  label: 'Admin',
                  onClick: () => window.open(`https://${cellData}--${account}.myvtex.com/admin`)
                }
              ]}
            />
          )
        },
      },
      ABTestBeginning: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.creation',
        })
      },
      ConversionA: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.conversion',
        })
      },
      ConversionALast24Hours: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.conversionLastHours',
        })
      },
      WorkspaceBSessions: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.sessions',
        })
      },
      WorkspaceBSessionsLast24Hours: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.sessionsLastHours',
        })
      },
      hours: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.hours',
        })
      },
      proportion: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.proportion',
        })
      },
      type: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.table.label.type',
        })
      },
      Winner: {
        minWidth: 200,
        title: intl.formatMessage({
          id: 'admin/admin.app.abtest.form.label.winnerLabel',
        }),
        cellRenderer: ({ cellData }: { cellData: string }) => {
          return (
            <Tag
              bgColor={cellData === "Not yet decided" ? '98BF5C' : '98BF5C'}
              color="#fff">
              <span className="nowrap">{cellData}</span>
            </Tag>
          )
        },
      }
    },
  }

  const lineActions = [
    {
      label: ({ rowData }: RowHeader) => `${intl.formatMessage({ id: 'admin/admin.app.abtest.form.finishTest.action' })} ${rowData.WorkspaceB}`,
      isDangerous: true,
      onClick: ({ rowData }: RowHeader) => {
        console.log(rowData)
        finishTest(rowData.WorkspaceB)
      },
    }
  ]

  const selectOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'conversion', label: 'Conversion' },
  ]

  function handleInput(key: string, value: string) {
    if (key === "name") {
      !checkWorkspaceName(value) ? setError(intl.formatMessage({ id: 'admin/admin.app.abtest.form.label.invalidWorkspaceName' })) : setError("")
    }
    setNewTest((prevState: any) => ({ ...prevState, [key]: value }))
  }

  return (
    <>
      <div className='mv4'>
        {success &&
          <Alert type={'success'} onClose={() => clearGeneralState()}>
            {success}
          </Alert>
        }
        {error &&
          <Alert type={'error'} onClose={() => clearGeneralState()}>
            {error}
          </Alert>
        }
      </div>
      <Table
        fullWidth
        schema={defaultSchema}
        items={tests}
        lineActions={lineActions}
        loading={loading}
        toolbar={{
          newLine: {
            label: intl.formatMessage({
              id: 'admin/admin.app.abtest.form.label.createTestAB',
            }),
            handleCallback: () => handleNewModal(true, "CREATE"),
          },
        }}
      />
      <Modal centered isOpen={modalOpen.isOpen && modalOpen.type === "CREATE"} onClose={() => handleNewModal(false, "CREATE")}>
        <div className="dark-gray">
          <p className="f3 fw3"><FormattedMessage id="admin/admin.app.abtest.form.label.createTestAB" /></p>
          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              className={'pr4 pb4'}
              style={{
                flex: '1 0 45%',
              }}
            >
              <Input
                dataAttributes={{
                  'hj-white-list': true,
                  test: 'workspace-input',
                }}
                errorMessage={error}
                label={intl.formatMessage({
                  id: 'admin/admin.app.abtest.table.label.workspaceName',
                })}
                type="text"
                onChange={(ev: EventInterface): void => {
                  handleInput("name", ev.target.value)
                }}
              />
            </div>
            <div
              className={'pr4 pb4'}
              style={{
                flex: '1 0 45%',
              }}
            >
              <Input
                dataAttributes={{
                  'hj-white-list': true,
                  test: 'workspace-input',
                }}
                label={intl.formatMessage({
                  id: 'admin/admin.app.abtest.form.label.proportion',
                })}
                type="number"
                onChange={(ev: EventInterface): void => {
                  handleInput("proportion", ev.target.value)
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              className={'pr4 pb4'}
              style={{
                flex: '1 0 45%',
              }}
            >
              <Input
                dataAttributes={{
                  'hj-white-list': true,
                  test: 'workspace-input',
                }}
                label={intl.formatMessage({
                  id: 'admin/admin.app.abtest.form.label.hours',
                })}
                type="number"
                onChange={(ev: EventInterface): void => {
                  handleInput("hours", ev.target.value)
                }}
              />
            </div>
            <div
              className={'pr4 pb4'}
              style={{
                flex: '1 0 45%',
              }}
            >
              <Dropdown
                label={intl.formatMessage({
                  id: 'admin/admin.app.abtest.form.label.type',
                })}
                options={selectOptions}
                value={newTest.type}
                onChange={(ev: EventInterface): void => {
                  handleInput("type", ev.target.value)
                }}
              />
            </div>
          </div>
          <div className={'mv4'}>
            <Button disabled={!isValid()} variation="primary" onClick={() => createNewTest(newTest)}>
              Guardar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ABTestTable
