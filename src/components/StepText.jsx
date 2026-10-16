import { forwardRef } from 'react'
import MediaCard from './MediaCard.jsx'
import { renderTextWithMarkup } from '../lib/textMarkup.jsx'

const StepText = forwardRef(function StepText(
  { steps, activeStepId, children, footer, registerMediaRef },
  ref
) {
  return (
    <div className="story__text" ref={ref}>
      {children}
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step step--${step.type} ${index === 0 ? 'step--first' : ''} ${
            activeStepId === step.id ? 'is-active' : ''
          }`}
          data-step-id={step.id}
        >
          {!step.hideText && (step.title || step.text) && (
            <div className="step__content">
              <h3>{step.title}</h3>
              {step.text
                ?.split('\n\n')
                .map((paragraph, i) => <p key={i}>{renderTextWithMarkup(paragraph)}</p>)}
              {step.image && <img src={step.image} alt={step.title} />}
            </div>
          )}
          {!step.hideMedia &&
            step.media?.map((media, mediaIndex) => (
              <MediaCard
                key={mediaIndex}
                media={media}
                compact={step.media.length > 1}
                mediaRef={(node) => registerMediaRef?.(`${step.id}::${mediaIndex}`, node)}
              />
            ))}
        </div>
      ))}
      {footer}
    </div>
  )
})

export default StepText
