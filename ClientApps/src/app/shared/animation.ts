import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';
  
  export const transAnimation = animation([
    style({
      height: '{{ height }}',
      opacity: '{{ opacity }}',
      backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
  ]);
  
  // Routable animations
  // export const slideInAnimation =
  //   trigger('routeAnimations', [
  //     transition('* <=> *', [
  //       style({ position: 'relative' }),
  //       query(':enter, :leave', [
  //         style({
  //           position: 'absolute',
  //           top: 0,
  //           left: 0,
  //           width: '100%'
  //         })
  //       ]),    
  //       query(':enter', [
  //         style({ left: '-100%'})
  //       ]),
  //       query(':leave', animateChild()),
  //       group([
  //         query(':leave', [
  //           animate('300ms ease-out', style({ left: '100%'}))
  //         ]),
  //         query(':enter', [
  //           animate('300ms ease-out', style({ left: '0%'}))
  //         ])
  //       ]),
  //       query(':enter', animateChild()),
  //     ]),
  //   ]);
  
  export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'relative',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}
export const slideInAnimation334=
trigger('routeAnimations', [
  transition('* => isLeft', transformTo({ x: -100, y: -100, rotate: -720 }) ),
  transition('* => isRight', transformTo({ x: 100, y: -100, rotate: 90 }) ),
  transition('isRight => *', transformTo({ x: -100, y: -100, rotate: 360 }) ),
  transition('isLeft => *', transformTo({ x: 100, y: -100, rotate: -360 }) )
]);


function transformTo({x = 100, y = 0, rotate = 0}) {
const optional = { optional: true };
return [
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ], optional),
  query(':enter', [
    style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`})
  ],{optional: true}),
  group([
    query(':leave', [
      animate('700ms ease-out', style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`})),
    ], optional),
    query(':enter', [
      animate('1000ms ease-out', style({ transform: `translate(0, 0) rotate(0)`})),
    ],{optional: true}),
  ]),
  query(':leave', animateChild({ duration: '1100ms' }),{optional: true}),
    query(':enter', animateChild({ duration: '1100ms' }),{optional: true}),
];
}
