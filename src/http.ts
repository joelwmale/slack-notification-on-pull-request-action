const fetch = require('node-fetch')

class Http {
  make(url: string, body: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(
        url,
        this.getOptions('post', body)
      ).then((res: Response) => resolve(res))
    })
  }

  getOptions(
    method: string,
    payload: Object
  ) {
    const options: any = {
      headers: {
        'Content-Type': 'application/json',
      },
      method
    }

    // set the body
    options.body = JSON.stringify(payload)

    return options
  }
}

export const http = new Http()
