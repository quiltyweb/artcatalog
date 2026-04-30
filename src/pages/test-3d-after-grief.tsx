import * as React from "react";
import { graphql, Link, useStaticQuery, type HeadFC } from "gatsby";
import SEO from "../components/SEO";

const PRODUCT_PATH = "/collections/original-paintings/after-grief/";
const PRODUCT_FALLBACK_URL = `https://www.brushella.art${PRODUCT_PATH}`;

const ModelViewer = "model-viewer" as unknown as React.ElementType;

type Model3dSource = {
  url: string;
  format: string;
  mimeType: string;
  filesize: number;
};

const Test3dAfterGriefPage: React.FC = (): React.ReactElement => {
  const data = useStaticQuery<Queries.Test3dAfterGriefQuery>(graphql`
    query Test3dAfterGrief {
      allShopifyProduct(filter: { handle: { eq: "after-grief" } }) {
        nodes {
          title
          handle
          description
          media {
            id
            alt
            mediaContentType
            ... on ShopifyModel3d {
              sources {
                url
                format
                mimeType
                filesize
              }
            }
          }
        }
      }
    }
  `);

  const product = data.allShopifyProduct.nodes[0];
  const model3d = product?.media.find(
    (m: { mediaContentType: string }) => m.mediaContentType === "MODEL_3D",
  ) as
    | { id: string; alt: string | null; sources?: Model3dSource[] }
    | undefined;
  const glbSource = model3d?.sources?.find(
    (s: Model3dSource) =>
      s.format?.toLowerCase() === "glb" || s.mimeType === "model/gltf-binary",
  );

  // https://developers.google.com/ar/develop/scene-viewer#intent_versioning
  const sceneViewerHref =
    glbSource && product
      ? `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
          glbSource.url,
        )}&mode=ar_preferred&enable_vertical_placement=true&title=${encodeURIComponent(
          product.title,
        )}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
          PRODUCT_FALLBACK_URL,
        )};end;`
      : null;

  return (
    <main style={{ maxWidth: 960, margin: "2rem auto", padding: "0 1rem" }}>
      <p>
        <Link to={PRODUCT_PATH}>← Back to After Grief product page</Link>
      </p>
      <h1>3D / AR test — {product?.title ?? "After Grief"}</h1>

      {!product && (
        <p>
          Product <code>after-grief</code> not found in build data. Run{" "}
          <code>gatsby clean &amp;&amp; gatsby develop</code> after attaching
          the 3D model in Shopify admin.
        </p>
      )}

      {product && !glbSource && (
        <p>
          No 3D model (.glb) attached to this product. Upload one in Shopify
          admin → Products → After Grief → Media.
        </p>
      )}

      {glbSource && (
        <>
          <ModelViewer
            src={glbSource.url}
            alt={model3d?.alt ?? product!.title}
            ar
            ar-placement="wall"
            ar-modes="scene-viewer webxr quick-look"
            camera-controls
            auto-rotate
            ar-scale="fixed"
            environment-image="neutral"
            shadow-intensity="0.8"
            style={{
              width: "100%",
              height: "560px",
              background: "#f5f5f5",
              borderRadius: 8,
            }}
          />

          <p style={{ marginTop: "1rem" }}>
            <a href={sceneViewerHref!}>
              Open in Google Scene Viewer (Android intent deep link)
            </a>
          </p>

          <details style={{ marginTop: "2rem" }}>
            <summary>Debug</summary>
            <pre
              style={{
                overflow: "auto",
                padding: "1rem",
                background: "#f5f5f5",
              }}
            >
              {JSON.stringify({ source: glbSource, sceneViewerHref }, null, 2)}
            </pre>
          </details>
        </>
      )}
    </main>
  );
};

export default Test3dAfterGriefPage;

export const Head: HeadFC = () => (
  <SEO
    pageTitle="3D / AR Test — After Grief"
    description="Internal test page for embedding a 3D product model with Google Scene Viewer deep linking."
  >
    <meta name="robots" content="noindex,nofollow" />
    <script
      type="module"
      src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
    />
  </SEO>
);
