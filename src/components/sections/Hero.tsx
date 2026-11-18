import { ShakeButton } from "@/components/hero/ShakeButton";
import { StickerPlayground } from "@/components/hero/StickerPlayground";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { Header } from "./Header";

export function Hero() {
  return (
    <header id="top" className="relative border-b-[3px] border-ink bg-sun">
      <Header />
      <Container className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pt-7">
        <h1 className="font-display text-[clamp(38px,7.2vw,92px)] leading-[.92] font-black tracking-[-.035em]">
          {site.headline[0]}
          <br />
          {site.headline[1]}
        </h1>
        <div className="grid max-w-[36ch] justify-items-start gap-3">
          <p className="text-[15px]">
            <b className="block text-[17px]">{site.name}</b>
            {site.intro}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <ShakeButton />
            <ButtonLink href="#work" variant="dark">
              See the work ↓
            </ButtonLink>
          </div>
        </div>
      </Container>
      <div className="relative mt-2 h-[clamp(260px,44vh,360px)] sm:h-[clamp(280px,50vh,500px)]">
        <StickerPlayground />
        {/* On touch screens the canvas eats swipes, so leave a strip for scrolling the page. */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0 z-[2] hidden w-11 touch-pan-y items-end justify-center bg-linear-to-r from-transparent to-ink/7 pb-3.5 pointer-coarse:flex"
        >
          <span className="text-[11px] font-bold tracking-[.12em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        </div>
      </div>
    </header>
  );
}
