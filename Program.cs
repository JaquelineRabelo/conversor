using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Configura a pasta wwwroot para servir arquivos estáticos
app.UseStaticFiles();

// Rota padrão que redireciona para o index.html
app.MapGet("/", () => Results.Redirect("/index.html"));

// Rota para converter moedas
app.MapGet("/converter", (decimal valor, string tipo) =>
{
    decimal resultado = 0;

    switch (tipo)
    {
        case "RealParaDolar":
            resultado = valor / 5.23m; // Taxa de câmbio do dólar em relação ao real
            break;
        case "RealParaEuro":
            resultado = valor / 6.19m; // Taxa de câmbio do euro em relação ao real
            break;
        case "DolarParaReal":
            resultado = valor * 5.23m; // Taxa de câmbio do dólar em relação ao real
            break;
        case "EuroParaReal":
            resultado = valor * 6.19m; // Taxa de câmbio do euro em relação ao real
            break;
        default:
            return Results.BadRequest("Tipo de conversão inválido.");
    }

    return Results.Ok(resultado);
});

app.Run();
