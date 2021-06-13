export default async function sleep(ms: number) {
    return new Promise<void>((res, rej) => setTimeout(() => res(), ms))
}