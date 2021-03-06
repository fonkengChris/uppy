const { inspect } = require('util')
const transloadit = require('@uppy/robodog')

/**
 * transloadit.form
 */

const formUppy = transloadit.form('#test-form', {
  debug: true,
  fields: ['message'],
  restrictions: {
    allowedFileTypes: ['.png']
  },
  waitForEncoding: true,
  params: {
    auth: { key: '05a61ed019fe11e783fdbd1f56c73eb0' },
    template_id: 'be001500a56011e889f9cddd88df842c'
  },
  modal: true,
  progressBar: '#test-form .progress'
})

formUppy.on('error', (err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formUppy.on('upload-error', (file, err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

window.formUppy = formUppy

const formUppyWithDashboard = transloadit.form('#dashboard-form', {
  debug: true,
  fields: ['message'],
  restrictions: {
    allowedFileTypes: ['.png']
  },
  waitForEncoding: true,
  params: {
    auth: { key: '05a61ed019fe11e783fdbd1f56c73eb0' },
    template_id: 'be001500a56011e889f9cddd88df842c'
  },
  dashboard: '#dashboard-form .dashboard'
})

window.formUppyWithDashboard = formUppyWithDashboard

/**
 * transloadit.modal
 */

function openModal () {
  transloadit.pick({
    restrictions: {
      allowedFileTypes: ['.png']
    },
    waitForEncoding: true,
    params: {
      auth: { key: '05a61ed019fe11e783fdbd1f56c73eb0' },
      template_id: 'be001500a56011e889f9cddd88df842c'
    },
    providers: [
      'webcam'
    ]
    // if providers need custom config
    // webcam: {
    //   option: 'whatever'
    // }
  }).then(console.log, console.error)
}

window.openModal = openModal

/**
 * transloadit.upload
 */

window.doUpload = (event) => {
  const resultEl = document.querySelector('#upload-result')
  const errorEl = document.querySelector('#upload-error')
  transloadit.upload(event.target.files, {
    waitForEncoding: true,
    params: {
      auth: { key: '05a61ed019fe11e783fdbd1f56c73eb0' },
      template_id: 'be001500a56011e889f9cddd88df842c'
    }
  }).then((result) => {
    resultEl.classList.remove('hidden')
    errorEl.classList.add('hidden')
    resultEl.textContent = inspect(result.results)
  }, (err) => {
    resultEl.classList.add('hidden')
    errorEl.classList.remove('hidden')
    errorEl.textContent = err.message
  })
}
