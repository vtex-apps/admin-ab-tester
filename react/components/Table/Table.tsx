import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  Table,
  Alert,
  Modal,
  Input,
  Dropdown,
  Button,
} from 'vtex.styleguide'

import { useABTestContext } from '../../context'

import { checkWorkspaceName, getPropertiesForSchema } from "./../../utils"

const ABTestTable = () => {
  const { tests, handleNewModal, modalOpen, createNewTest, error, setError, success, clearGeneralState, loading, emptyMessage } = useABTestContext()

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
    properties: getPropertiesForSchema(tests)
  }


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

  var proportionTableIndex = 3;


  if(tests && tests.length > 0) {
    var firstWorkspaceProportion;
    var amountOfABTests = Object.entries(tests[proportionTableIndex]).length - 2
    var [keys] = Object.entries(tests[proportionTableIndex])

    for (const [key, value] of Object.entries(tests[proportionTableIndex])) {
      if(key == 'master' || key == 'Value'){} else {
        if (!firstWorkspaceProportion) {
          firstWorkspaceProportion = tests[proportionTableIndex][key].value
        }
        tests[proportionTableIndex][key] = { type: 'proportion', value: (firstWorkspaceProportion / amountOfABTests).toFixed(2) }
      }
    }
    tests[proportionTableIndex].master = { type: 'proportion', value: (100 - firstWorkspaceProportion).toFixed(2) }
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
        loading={loading}
        emptyStateLabel={emptyMessage}
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
                type="number" min="0" max="100"
                onChange={(ev: EventInterface): void => {
                  handleInput("proportion", ((100 - parseInt(ev.target.value)) * 100).toString())
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
              <FormattedMessage id="admin/admin.app.abtest.form.saveButton" />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ABTestTable
