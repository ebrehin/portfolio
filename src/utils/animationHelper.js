export const playAnimation = (actions, name) => {
    Object.values(actions).forEach((action) => action.stop());
    if (actions[name]) {
      actions[name].reset();
      actions[name].play();
    }
  };
  
export const playAnimationWithDelay = (actions, name, delay) => {
    setTimeout(() => {
      playAnimation(actions, name);
    }, delay);
  };
  