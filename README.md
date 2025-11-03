
useSate
useeffect
useref
usecontext
Usecalback=>remember function
React memo=>memorize component
useMemo=>memorize value

usereducer==usestate
uselayouteffect=useeffect
useEffect → runs after screen update
useLayoutEffect → runs before screen update

1 .useLayoutEffect(() => {
  console.log("Runs after every render");
});
Runs once after the first render

Runs again after every re-render

Cleanup (if returned) runs before next effect or unmount
2️⃣ Runs only once (on mount)
useLayoutEffect(() => {
  console.log("Runs only once when component mounts");
}, []);


Runs only on first render

Cleanup (if returned) runs on unmount

3️⃣ Runs when dependencies change
useLayoutEffect(() => {
  console.log("Runs when todo changes");
}, [todo]);


Runs on first render

Runs again whenever todo changes

Cleanup runs before next effect or unmount
| Syntax                      | Runs When                      | Recalculates When       | Common Use                        |
| --------------------------- | ------------------------------ | ----------------------- | --------------------------------- |
| `useMemo(() => {}, [])`     | Once (on mount)                | Never                   | Static value                      |
| `useMemo(() => {}, [todo])` | On mount + when `todo` changes | When dependency changes | Derived values                    |
| `useMemo(() => {})`         | Every render                   | Every render            | Not recommended (same as no memo) |

register(name, options) returns an object containing the props you should pass to a native form element. Typical keys:

name — the field name (string)

onChange — function to call when input value changes

onBlur — function to call when input loses focus (used for validation)

ref — ref to the DOM element (used to read value directly)

sometimes value (for some inputs) 
So this:

<input {...register("email", { required: true })} />


is roughly equivalent to:

const props = register("email", { required: true });
<input name={props.name} onChange={props.onChange} onBlur={props.onBlur} ref={props.ref} />
"fieldName" (first argument)

Unique key used to store that field’s value, errors, and to watch it.

Nested names allowed: "address.city" or arrays like "friends[0].name".

{ /* options */ } (second argument)

An options object that sets validation rules and some behaviors. Common options:

required: true | "message" — field must have value

minLength: { value: n, message: "..." } — minimum length for strings

maxLength: { value: n, message: "..." }

pattern: { value: /regex/, message: "..." } — regex match

validate: (value) => boolean | string | Promise — custom validator (return true or error message)

valueAsNumber: true — store value as number (useful for <input type="number">)

valueAsDate: true — parse value as Date

setValueAs: v => transformed — transform before storing

shouldUnregister: true|false — whether to unregister when unmounted (used with dynamic fields)