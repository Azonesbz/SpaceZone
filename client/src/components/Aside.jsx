export default function Aside() {
    return (
        <>
            <aside className="hidden md:sticky top-5 md:flex flex-col p-5 col-span-6 w-1/4 bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl h-48 order-2">
                <h2 className="font-raleway text-xl font-semibold">Catégorie</h2>
                <h2 className="font-raleway text-xl font-semibold">Filtre</h2>
            </aside>
        </>
    )
}