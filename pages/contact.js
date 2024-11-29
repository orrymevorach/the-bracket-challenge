import Form from '@/components/contact/form/form';
import Meta from '@/components/shared/Head/Head';
import Layout from '@/components/shared/Layout/Layout';

export default function ContactPage() {
  return (
    <div>
      <Meta title="Contact Us" />
      <Layout>
        <Form />
      </Layout>
    </div>
  );
}
