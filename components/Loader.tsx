import Image from 'next/image';
import {Hourglass} from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
  </div>
  );
};

export default Loader;