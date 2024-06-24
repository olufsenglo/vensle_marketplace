import React from 'react'

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
	  resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
	  <>
	     <input type='checkbox' className="ml-5 focus-ring rounded border border-gray-300 focus:ring-ADashPrimary h-5 w-5" ref={resolvedRef} {...rest} />
	  </>
  )
})
