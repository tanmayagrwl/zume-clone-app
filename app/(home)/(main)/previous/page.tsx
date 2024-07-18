import CallList from "@/components/CallList"
export default function HomePage () {
    return ( <section className="previous-container py-40 flex size-full flex-col gap-10 text-white">
                <h1 className="text-3xl font-bold">Previous Meetings</h1>
                    <CallList type="ended" />
            </section>)
}