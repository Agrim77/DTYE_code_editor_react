import React, { useState } from 'react'

//i used codemirror library for text editor implementation. Check out https://codemirror.net for more.
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
//for html
import 'codemirror/mode/xml/xml'
//for javascript
import 'codemirror/mode/javascript/javascript'
//for css
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

//props to get information from editor
export default function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props
    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        //editor area container and setup
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
          <div className="editor-title">
            {displayName}
            <button
              type="button"
              className="expand-collapse-btn"
              onClick={() => setOpen(prevOpen => !prevOpen)}
            >
              <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
            </button>
          </div>
          <ControlledEditor
            onBeforeChange={handleChange}
            value={value}
            className="code-mirror-wrapper"
            options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              theme: 'material', //for dark theme
              lineNumbers: true
            }}
          />
        </div>
      )
    }
    