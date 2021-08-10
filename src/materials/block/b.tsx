export default function ({
  list = [
    {
      title: 'Lorem',
      value: '123,4',
      href: 'https://www.weaver.com.cn',
      img: 'https://jdc.jd.com/img/36x36?text=%20',
    },
    {
      title: 'Lorem',
      value: '123,4',
      href: 'https://www.weaver.com.cn',
      img: 'https://jdc.jd.com/img/36x36?text=%20',
    },
    {
      title: 'Lorem',
      value: '123,4',
      href: 'https://www.weaver.com.cn',
      img: 'https://jdc.jd.com/img/36x36?text=%20',
    },
    {
      title: 'Lorem',
      value: '123,4',
      href: 'https://www.weaver.com.cn',
      img: 'https://jdc.jd.com/img/36x36?text=%20',
    },
    {
      title: 'Lorem',
      value: '123,4',
      href: 'https://www.weaver.com.cn',
      img: 'https://jdc.jd.com/img/36x36?text=%20',
    },
    {
      title: 'Lorem',
      value: '123,4',
      href: 'https://www.weaver.com.cn',
      img: 'https://jdc.jd.com/img/36x36?text=%20',
    },
  ],
  column = 3,
  color = 'blue',
}) {
  return (
    <>
      <div className="flex flex-wrap items-center content-center">
        {list.map((v, k) => (
          <div className={`w-1/${column} py-4 my-2`}>
            <a
              className={`w-full h-full cursor-pointer flex justify-center py-1 border-solid border-0 border-gray-200 ${
                (k + 1) % column != 0 ? 'border-r' : ''
              } `}
              href={v.href}
              target="_blank"
            >
              <img
                className="flex flex-col justify-center items-center shadow rounded-full w-12 h-12"
                src={v.img}
              />
              <div className="">
                <p
                  className={`pl-2 font-bold text-2xl text-${color}-500 turncase`}
                >
                  {v.value}
                </p>
                <p className="pl-2 text-gray-600 turncase">{v.title}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <style
        scoped
        dangerouslySetInnerHTML={{
          __html: `
        @import url("https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css");
      `,
        }}
      />
    </>
  );
}
