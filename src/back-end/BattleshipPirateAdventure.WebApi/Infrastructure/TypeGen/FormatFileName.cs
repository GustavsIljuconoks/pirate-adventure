using TypeGen.Core.Converters;

namespace BattleshipPirateAdventure.WebApi.Infrastructure.TypeGen;

public class FormatFileName : ITypeNameConverter
{
    public string Convert(string name, Type type)
    {
        return $"{name}.generated";
    }
}
