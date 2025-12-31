export const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer>
      <div className="mt-14 pt-8 px-5 border-t">
        <div className="max-w-7xl mx-auto px-5">
          <p className="text-center text-sm dark:text-slate-300 text-balance">
            Copyright © {date} Weather or Not? All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
