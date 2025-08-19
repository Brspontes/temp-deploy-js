import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from "@/utils/icons";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import Avatar from "antd/es/avatar";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Title from "antd/es/typography/Title";
import Tag from "antd/es/tag";

function Dashboard() {
  const jobData = [
    {
      title: "Ativação John Say",
      location: "Rua João da Cruz",
      date: "23 a 26 de Setembro",
      candidates: "2 de 2 candidatos selecionados",
      status: "A DECORRER",
      statusColor: "#6366f1",
      price: "50€"
    },
    {
      title: "Ativação Chocolates Deco",
      location: "Casa da Prelada",
      date: "24 a 26 de Setembro",
      candidates: "3 de 3 de candidatos selecionados",
      status: "FECHADO",
      statusColor: "#6366f1",
      price: "40€"
    },
    {
      title: "Ativação Flor do Sobral",
      location: "Porto de Lisboa",
      date: "23 a 26 de Setembro",
      candidates: "2 de 4 candidatos selecionados", 
      status: "ABERTO",
      statusColor: "#10b981",
      price: "75€"
    },
    {
      title: "Ativação Jack",
      location: "Centro Comercial Tavares",
      date: "20 a 23 de Setembro",
      candidates: "4 de 4 candidatos selecionados",
      status: "CONCLUIR",
      statusColor: "#f59e0b",
      price: "145€"
    },
    {
      title: "Ativação Bombeys",
      location: "Mercado de Santiago",
      date: "16 a 20 de Setembro",
      candidates: "5 de 5 candidatos selecionados",
      status: "CONCLUÍDO",
      statusColor: "#6366f1",
      price: "110€"
    }
  ];

  return (
    <div style={{ padding: '34px'}}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a' }}>
          DASHBOARD
        </Title>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#ef4444', 
            borderRadius: '50%', 
            marginRight: '8px' 
          }}></div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
            Live Control
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', overflowX: 'auto' }}>
        <Card
          style={{ 
            minWidth: '240px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
              Extras para Loja GreenWear
            </span>
            <Tag style={{ 
              background: '#f3f4f6', 
              color: '#6b7280', 
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              padding: '2px 8px'
            }}>
              Concluir
            </Tag>
          </div>
          
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0' }}>
            <EnvironmentOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
            Jardim das Madalenas
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <CalendarOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              23 de Setembro
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <ClockCircleOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              12:00 - 17:00
            </span>
          </div>

          <Avatar.Group maxCount={3} size={32}>
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
          </Avatar.Group>
        </Card>

        <Card
          style={{ 
            minWidth: '240px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
              Extras para Loja GreenWear
            </span>
            <Tag style={{ 
              background: 'linear-gradient(132.3deg, #655ede 10.65%, #e89de7 85.2%)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              padding: '2px 8px'
            }}>
              Live
            </Tag>
          </div>
          
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0' }}>
            <EnvironmentOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
            Jardim das Madalenas
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <CalendarOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              23 de Setembro
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <ClockCircleOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              18:00 - 23:00
            </span>
          </div>

          <Avatar.Group maxCount={3} size={32}>
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
          </Avatar.Group>
        </Card>

        <Card
          style={{ 
            minWidth: '240px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
              Extras para Loja GreenWear
            </span>
            <Tag style={{ 
              background: '#ddd6fe', 
              color: '#6366f1', 
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              padding: '2px 8px'
            }}>
              19:00
            </Tag>
          </div>
          
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0' }}>
            <EnvironmentOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
            Jardim das Madalenas
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <CalendarOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              24 de Setembro
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <ClockCircleOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              19:00 - 21:00
            </span>
          </div>

          <Avatar.Group maxCount={4} size={32}>
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
          </Avatar.Group>
        </Card>

        <Card
          style={{ 
            minWidth: '240px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
              Extras para GreenWear
            </span>
          </div>
          
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0' }}>
            <EnvironmentOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
            Jardim das Madalenas
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <CalendarOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
              23 de Setembro
            </span>
          </div>

          <Avatar.Group maxCount={2} size={32}>
            <Avatar src="/src/assets/img/avatarlogo.png" />
            <Avatar src="/src/assets/img/avatarlogo.png" />
          </Avatar.Group>
        </Card>
      </div>

      <Card
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={3} style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
            Meus Anúncios
          </Title>
          <Button
            icon={<PlusOutlined />}
            style={{
              background: 'linear-gradient(132.3deg, #655ede 10.65%, #e89de7 85.2%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Criar anúncio
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {jobData.map((job, index) => (
            <div 
              key={job.title}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div style={{ 
                minWidth: '24px', 
                fontSize: '14px', 
                color: '#6b7280',
                marginRight: '16px'
              }}>
                {index + 1}.
              </div>

              <div style={{ 
                minWidth: '32px', 
                height: '32px',
                backgroundColor: '#6366f1',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <span style={{ color: '#fff', fontSize: '16px' }}>💼</span>
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: '#1a1a1a',
                  marginBottom: '4px'
                }}>
                  {job.title}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
                  <span>
                    <EnvironmentOutlined style={{ marginRight: '4px' }} />
                    {job.location}
                  </span>
                  <span>
                    <CalendarOutlined style={{ marginRight: '4px' }} />
                    {job.date}
                  </span>
                  <span>{job.candidates}</span>
                </div>
              </div>

              <div style={{ marginRight: '16px' }}>
                <Tag
                  style={{
                    backgroundColor: job.statusColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '10px',
                    padding: '4px 12px',
                    fontWeight: 500
                  }}
                >
                  {job.status}
                </Tag>
              </div>

              <div style={{ 
                minWidth: '60px', 
                textAlign: 'right',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginRight: '16px'
              }}>
                {job.price}
              </div>

              <Button
                type="text"
                icon={<MoreOutlined />}
                style={{ color: '#6b7280' }}
              />
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Button
            type="link"
            style={{ color: '#6b7280', fontSize: '14px' }}
          >
            Ver todos (14)
          </Button>
        </div>
      </Card>

      <Card
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginTop: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={3} style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
            Atividade Recente
          </Title>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            13/03/2023 a 20/03/2023
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div style={{ 
              minWidth: '40px', 
              height: '40px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <span style={{ color: '#fff', fontSize: '18px' }}>✓</span>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#1a1a1a',
                marginBottom: '2px'
              }}>
                John Santos
              </h4>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Pagamento
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                20/03/2023 18:30
              </span>
              <Button
                type="text"
                style={{ color: '#6b7280', padding: '4px' }}
              >
                →
              </Button>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div style={{ 
              minWidth: '40px', 
              height: '40px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <span style={{ color: '#fff', fontSize: '18px' }}>✉</span>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#1a1a1a',
                marginBottom: '2px'
              }}>
                Frederico Neves
              </h4>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Mensagem
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                20/03/2023 17:30
              </span>
              <Button
                type="text"
                style={{ color: '#6b7280', padding: '4px' }}
              >
                →
              </Button>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div style={{ 
              minWidth: '40px', 
              height: '40px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <span style={{ color: '#fff', fontSize: '18px' }}>✓</span>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#1a1a1a',
                marginBottom: '2px'
              }}>
                Eric Bold
              </h4>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Pagamento
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                17/03/2023 18:30
              </span>
              <Button
                type="text"
                style={{ color: '#6b7280', padding: '4px' }}
              >
                →
              </Button>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 0'
          }}>
            <div style={{ 
              minWidth: '40px', 
              height: '40px',
              backgroundColor: '#6366f1',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <span style={{ color: '#fff', fontSize: '18px' }}>↑</span>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#1a1a1a',
                marginBottom: '2px'
              }}>
                Rosa Santos
              </h4>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Upload
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                13/03/2023 18:30
              </span>
              <Button
                type="text"
                style={{ color: '#6b7280', padding: '4px' }}
              >
                →
              </Button>
            </div>
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Button
            type="link"
            style={{ color: '#6b7280', fontSize: '14px' }}
          >
            Ver todos (12)
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
