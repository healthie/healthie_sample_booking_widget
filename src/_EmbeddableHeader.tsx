import * as React from "react";

function EmbeddableHeader(props: any) {

    const maxStep = Math.min(props.stepIndex+1, props.embedWidgetSteps ? props.embedWidgetSteps.length : 1)
    return (
      <div className="embeddable-booking-header">
        <div className="is-full-width">
          <div className="">
            <div className="large-title has-text-left">
              {props.headerText}
            </div>
          </div>
          <div className="embedded-view mobile-nav">
            <div className="step-header">
              <div className="mobile-nav-arrow">
                {props.embedWidgetSteps &&
                props.embedWidgetSteps[props.stepIndex - 1] ? (
                   <a className="has-pointer" onClick={() => props.setStepIndex(props.stepIndex - 1)}>
                    ◀
                  </a>
                ) : null}
              </div>
              <div className="mobile-nav-header">
                <div className="instruction is-fullwidth">{props.embedWidgetSteps &&
                props.embedWidgetSteps[props.stepIndex]
                  ? props.embedWidgetSteps[props.stepIndex].title
                  : null}
                </div>
                <div className="progress is-fullwidth">
                  Step {maxStep} of {props.embedWidgetSteps ?
                   props.embedWidgetSteps.length : null}
                </div>
              </div>
              <div className="spacing">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EmbeddableHeader;
