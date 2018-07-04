const callGuard = (guards, from, to, lastNext, i) => {
  let guard = guards[i];

  if (guard == undefined)
    lastNext();

  if (guards.length == i + 1)
    guard(from, to, lastNext);
  else
    guard(from, to, nextArg => {
      typeof(nextArg) == 'undefined' ? callGuard(guards, from, to, lastNext, i + 1) : lastNext(nextArg);
    });
};
export const multiGuard = (guards = []) => ((to, from, next) => {
  callGuard(guards, from, to, next, 0);
});
