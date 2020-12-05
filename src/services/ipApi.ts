import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCountryFromIp(ip: string): Promise<string | undefined> {
  try {
    const { data } = await axios(`https://ipapi.co/${ip}/country/`)
    return data;
  } catch (error) {
    console.log(error);
    return undefined
  }
}