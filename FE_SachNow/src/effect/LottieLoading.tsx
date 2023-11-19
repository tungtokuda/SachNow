import Lottie from 'lottie-react'
import Loading from '../assets/loading-animation.json'
const LottieLoading = () =>{
  return (
    <div className="">
       <Lottie animationData={Loading} className='w-32'/>
    </div>
  )
}
export default LottieLoading