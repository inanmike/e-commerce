import React, { useState , useEffect} from 'react'

export const useOrgin = () => {

  const [mounted, setMounted] = useState(false)
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin :'';
  
  useEffect(() => {
    setMounted(true)
  },[])
  return (
    <div>UseOrgin</div>
  )

  if(!mounted){
    return ''
  }
  return origin;
}