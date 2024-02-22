import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <p className='text-green-900 text-xl mb-4'>صفحه یافت نشد!</p>
      <Link className='text-blue-600' to={"/dashboard"} >بازگشت</Link>
    </div>
  )
}

export default NotFound
