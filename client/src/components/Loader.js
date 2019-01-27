import React from 'react'

export default ({ loaderText }) => (
  <div>
    <div class="ui segment">
      <div class="ui active transition visible dimmer">
        <div class="content">
          <div class="ui indeterminate text loader">
            {loaderText}
          </div>
        </div>
      </div>
    </div>
  </div>
)
