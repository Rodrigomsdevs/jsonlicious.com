export function Footer() {
  return (
    <footer className="w-full py-4 px-4 border-t">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground px-4 w-full">
        <div>
          <p>
            &copy; {new Date().getFullYear()} JSONlicious. Desenvolvido por{" "}
            <a
              href="https://github.com/Rodrigomsdevs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              Rodrigomsdevs
            </a>
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/Rodrigomsdevs/jsonlicious.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Rodrigomsdevs/jsonlicious.com/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Reportar Bug
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Rodrigomsdevs/jsonlicious.com/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Licença
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
