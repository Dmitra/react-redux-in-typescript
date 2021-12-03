# Goal
augment utils/createFeature and boot/state/combination functions with types
walk through all TODO markers in the code

# Ensure
- no change in exports in files of feature
- type of `Feature.actions.action`, like `App.actions.boot`
- type of Action.meta, like in `App.actions.toggleLoading`
- type of `Feature.components`
- type of `Feature.model.constant`, like `App.model.palette.main`
- extraReducers
- selector usage in reducer using `action.global`
- synchronous selector usage in effect using `action.global`