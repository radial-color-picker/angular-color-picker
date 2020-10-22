import { animate, AnimationMetadata, AnimationTriggerMetadata, keyframes, query, state, style, transition, trigger } from '@angular/animations';

export const Animations: {
  buttonAnimation: AnimationTriggerMetadata;
  rippleAnimation: AnimationTriggerMetadata;
} = {
  buttonAnimation: trigger('buttonAnimation', [
    state('void', style({ transform: 'scale3d(1, 1, 1)' })),
    state('false', style({ transform: 'scale3d(1, 1, 1)' })),
    state('true', style({ transform: 'scale3d(1, 1, 1)' })),
    transition('* => 1', [
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', keyframes([
        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
        style({ transform: 'scale3d(0.8, 0.8, 1)', offset: 0.25 }),
        style({ transform: 'scale3d(1, 1, 1)', offset: 0.5 }),
        style({ transform: 'scale3d(1, 1, 1)', offset: 1.0 }),
      ])),
    ])
  ]),
  rippleAnimation: trigger('rippleAnimation', [
    state('void', style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 1)' })),
    state('false', style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 1)' })),
    state('true', style({ opacity: 0, transform: 'scale3d(0.8, 0.8, 1)' })),
    transition('* => 1', [
      query(':self',
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', keyframes([
          style({ opacity: 0.2, transform: 'scale3d(0.8, 0.8, 1)', offset: 0 }),
          style({ opacity: 0.2, transform: 'scale3d(0.8, 0.8, 1)', offset: 0.20 }),
          style({ opacity: 0, borderWidth: 0, transform: 'scale3d({{scale}}, {{scale}}, 1)', offset: 1.0 }),
        ])),
        {
          params: {
            scale: '3.8'
          }
        }
      )
    ])
  ])
};

export const AnimationsMeta: {
  knobAnimationEnter: AnimationMetadata[];
  knobAnimationExit: AnimationMetadata[];
  gradientAnimationEnter: AnimationMetadata[];
  gradientAnimationExit: AnimationMetadata[];
} = {
  knobAnimationEnter: [
    style({ opacity: 1, transform: 'scale3d(1, 1, 1)' }),
    animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', keyframes([
      style({ opacity: 1, transform: 'scale3d(0, 0, 1)', offset: 0 }),
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 1.0 }),
    ]))
  ],
  knobAnimationExit: [
    style({ opacity: 0, transform: 'scale3d(0, 0, 1)' }),
    animate('100ms cubic-bezier(0.0, 0.0, 0.2, 1)', keyframes([
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 0 }),
      style({ opacity: 1, transform: 'scale3d(0, 0, 1)', offset: 1.0 }),
    ]))
  ],
  gradientAnimationEnter: [

    style({ opacity: 1, transform: 'scale3d(1, 1, 1)' }),
    animate('200ms cubic-bezier(0.4, 0.0, 1, 1)', keyframes([
      style({ opacity: 1, transform: 'scale3d(0, 0, 1)', offset: 0 }),
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 1.0 }),
    ]))
  ],
  gradientAnimationExit: [
    style({ opacity: 0, transform: 'scale3d(0, 0, 1)' }),
    animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)', keyframes([
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 0 }),
      style({ opacity: 1, transform: 'scale3d(0, 0, 1)', offset: 1.0 }),
    ]))
  ],

};

