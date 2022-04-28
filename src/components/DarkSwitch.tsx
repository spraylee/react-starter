export const DarkSwitch = () => {
  return (
    <div className="dark-switch">
      <input
        type="checkbox"
        id="dark-switch"
        onChange={(e) => {
          console.log(e)
          if (e.target.value === 'dark') {
            document.body.classList.add('dark')
          } else {
            document.body.classList.remove('dark')
          }
        }}
      />
      <label htmlFor="dark-switch" className="dark-switch-label">
        <span className="dark-switch-inner"></span>
        <span className="dark-switch-switch"></span>
      </label>
    </div>
  )
}
