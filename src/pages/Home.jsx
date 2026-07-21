import { Link } from "react-router-dom";
import {
  HeartPulse,
  Pill,
  Baby,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 py-20 md:flex-row">
          <div className="max-w-xl">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Até 50% OFF
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Sua saúde em primeiro lugar.
            </h1>

            <p className="mt-5 text-lg opacity-90">
              Encontre medicamentos, vitaminas e produtos de higiene com
              qualidade e praticidade.
            </p>

            <Link
              to="/produtos"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-red-600 transition hover:scale-105"
            >
              Ver Produtos
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="hidden md:block">
            <HeartPulse size={220} className="opacity-20" />
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Categorias
          </h2>

          <p className="mt-3 text-gray-500">
            Encontre rapidamente o que procura.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <Link
            to="/categorias"
            className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <Pill className="mx-auto mb-4 text-red-600" size={50} />
            <h3 className="font-bold text-lg">Medicamentos</h3>
          </Link>

          <Link
            to="/categorias"
            className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <Sparkles className="mx-auto mb-4 text-red-600" size={50} />
            <h3 className="font-bold text-lg">Vitaminas</h3>
          </Link>

          <Link
            to="/categorias"
            className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <HeartPulse className="mx-auto mb-4 text-red-600" size={50} />
            <h3 className="font-bold text-lg">Bem-estar</h3>
          </Link>

          <Link
            to="/categorias"
            className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <Baby className="mx-auto mb-4 text-red-600" size={50} />
            <h3 className="font-bold text-lg">Infantil</h3>
          </Link>

        </div>
      </section>

      {/* Destaque */}
      <section className="bg-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Produtos em destaque
          </h2>

          <p className="mt-4 text-gray-500">
            Confira os principais produtos disponíveis na loja.
          </p>

          <Link
            to="/produtos"
            className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            Explorar catálogo
          </Link>

        </div>
      </section>
    </>
  );
}